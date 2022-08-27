

resource "aws_ecs_service" "praisebot-svc" {
  cluster                            = var.ecs_cluster
  task_definition                    = aws_ecs_task_definition.praisebot.arn
  desired_count                      = 1
  launch_type                        = "FARGATE"
  name                               = "praisebot"
  deployment_maximum_percent         = 200
  deployment_minimum_healthy_percent = 100
  load_balancer {
    target_group_arn = aws_alb_target_group.praisebot-tg.arn
    container_name   = "praisebot-api"
    container_port   = 3000
  }
  network_configuration {
    subnets         = var.subnets
    security_groups = [aws_security_group.praisebot-sg.arn]
  }
  tags = {
    "service" = "praisebot"
  }
}
resource "aws_security_group" "praisebot-sg" {
  name        = "praisebot-sevice-sg"
  description = "Allow traffic to the service"
  vpc_id      = var.vpc

  ingress {
    description = "sevice-ingress"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]

  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    "service" = "praisebot"
  }
}
resource "aws_iam_role" "task_execution_role" {
  name = "praisebotTaskExecutionRole"
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
    "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
  ]
  assume_role_policy = jsonencode({
    "Version" : "2008-10-17",
    "Statement" : [
      {
        "Sid" : "",
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "ecs-tasks.amazonaws.com"
        },
        "Action" : "sts:AssumeRole"
      }
    ]
  })
  tags = {
    "service" = "praisebot"
  }
}
resource "aws_ecs_task_definition" "praisebot" {

  family                   = "praisebot"
  task_role_arn            = aws_iam_role.task_execution_role.arn
  execution_role_arn       = aws_iam_role.task_execution_role.arn
  requires_compatibilities = ["FARGATE"]
  container_definitions = jsonencode([
    {
      name        = "praisebot-api"
      image       = "${var.docker_image}"
      cpu         = 256
      memory      = 1024
      essential   = true,
      environment = var.environment_variables
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
    }
  ])
  tags = {
    "service" = "praisebot"
  }
}

resource "aws_alb_target_group" "praisebot-tg" {
  target_type = "ip"
  name        = "praisebot-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = var.vpc_cidr
  health_check {
    path    = "/"
    matcher = "200-499"
  }
  tags = {
    "service" = "praisebot"
  }
}
