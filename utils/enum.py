from enum import Enum


class ModelEnum(str, Enum):
    @classmethod
    def choices(cls):
        return tuple((i.value, i.name) for i in cls)
