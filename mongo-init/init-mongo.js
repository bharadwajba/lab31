db = db.getSiblingDB("myAppDB");

db.createCollection("users");
db.createCollection("posts");
db.createCollection("students");
db.createCollection("courses");
