variable "ecs_cluster" {
  type        = string
  description = "the arn for your cluster"

}
variable "vpc" {
  type = string

  description = "The arn for your vpc"
}
variable "vpc_cidr" {
  type = string

  description = "The CIDR for your vpc"
}
variable "subnets" {
  type = list(string)

}
variable "docker_image" {
  type        = string
  description = "The Docker image to use when creating the service"
  default     = "value"
}
variable "environment_variables" {

  type = list(map(any))
}
