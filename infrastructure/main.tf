terraform {
  required_version = ">= 1.0.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region="us-east-1"
}

module "ecs_cluster" {
  source = "./modules/ecs-cluster"
  subnets =  var.subnets
  ecs_cluster = var.ecs_cluster
  environment_variables = var.environment_variables
  vpc = var.vpc
  vpc_cidr = var.vpc_cidr
  docker_image = var.docker_image
}

module "dynamodb" {
  source = "./modules/dynamodb"
}