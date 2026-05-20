from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserMin(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    title: Optional[str] = None
    description: Optional[str] = None

class Task(TaskBase):
    id: int
    owner_id: int
    owner: Optional[UserMin] = None

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: Optional[str] = "user"

class UserLogin(UserBase):
    password: str

class User(UserBase):
    id: int
    role: str
    is_active: bool
    tasks: List[Task] = []

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
