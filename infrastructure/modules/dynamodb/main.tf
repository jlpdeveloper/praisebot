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
  server_side_encryption {
    enabled = true
  }
  

}
