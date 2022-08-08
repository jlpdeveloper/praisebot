resource "aws_dynamodb_table" "praisebot" {
  name           = "Praisebot"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "userId"
  range_key      = "createdOn"

  attribute {
    name = "userId"
    type = "S"
  }
  attribute {
    name = "createdOn"
    type = "N"
  }
   attribute {
    name = "weekStart"
    type = "N"
  }
  server_side_encryption {
    enabled = true
  }
  global_secondary_index {
    name               = "CreatedOnIndex"
    hash_key           = "createdOn"
    write_capacity     = 20
    read_capacity      = 20
    projection_type    = "ALL"
  }

  global_secondary_index {
    name               = "WeeklyIndex"
    hash_key           = "weekStart"
    write_capacity     = 20
    read_capacity      = 20
    projection_type    = "ALL"
  }

  

}
