from pydantic import BaseModel, EmailStr
from typing import List, Optional
from uuid import UUID

#base schema for users
class UserBase(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    middle_name: Optional[str] = None
    gender: Optional[str] = None
    roles: Optional[List[str]] = None

# Schema for creating users
class UserCreate(UserBase):
    first_name: str
    last_name: str
    email: EmailStr
    password: str

# Schema for reading users
class UserRead(UserBase):
    id: UUID
    email: EmailStr

    class Config:
        orm_mode = True #tells Pydantic that it can read data directly from ORM models (SQLAlchemy objects)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None
    roles: Optional[List[str]] = None

#It extends BaseModel so it gets all the features of Pydantic models:
# Automatic data validation (checks types, required fields, etc.)
#Easy conversion to and from dictionaries and JSON
#Helpful error messages if data is wrong or missing