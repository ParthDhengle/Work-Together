# -*- coding: utf-8 -*-
# code generated by Prisma. DO NOT EDIT.
# pyright: reportUnusedImport=false
# fmt: off

# global imports for type checking
from builtins import bool as _bool
from builtins import int as _int
from builtins import float as _float
from builtins import str as _str
import sys
import decimal
import datetime
from typing import (
    TYPE_CHECKING,
    Optional,
    Iterable,
    Iterator,
    Sequence,
    Callable,
    ClassVar,
    NoReturn,
    TypeVar,
    Generic,
    Mapping,
    Tuple,
    Union,
    List,
    Dict,
    Type,
    Any,
    Set,
    overload,
    cast,
)
from typing_extensions import TypedDict, Literal


LiteralString = str
# -- template enums.py.jinja --
from ._compat import StrEnum


class ProjectStatus(StrEnum):
    PENDING = 'PENDING'
    IN_PROGRESS = 'IN_PROGRESS'
    COMPLETED = 'COMPLETED'

class TaskStatus(StrEnum):
    PENDING = 'PENDING'
    ASSIGNED = 'ASSIGNED'
    IN_PROGRESS = 'IN_PROGRESS'
    COMPLETED = 'COMPLETED'
    FAILED = 'FAILED'

class WorkerStatus(StrEnum):
    AVAILABLE = 'AVAILABLE'
    BUSY = 'BUSY'
    OFFLINE = 'OFFLINE'

class Priority(StrEnum):
    HIGH = 'HIGH'
    MEDIUM = 'MEDIUM'
    LOW = 'LOW'

class Team(StrEnum):
    BUSINESS_AND_MANAGEMENT = 'BUSINESS_AND_MANAGEMENT'
    DESIGN_AND_ARCHITECTURE = 'DESIGN_AND_ARCHITECTURE'
    FRONTEND_DEVELOPMENT = 'FRONTEND_DEVELOPMENT'
    BACKEND_DEVELOPMENT = 'BACKEND_DEVELOPMENT'
    DATABASE_DEVELOPMENT = 'DATABASE_DEVELOPMENT'
    FULLSTACK_DEVELOPMENT = 'FULLSTACK_DEVELOPMENT'
    SUPPORT_FOR_TESTING_AND_DEPLOYMENT = 'SUPPORT_FOR_TESTING_AND_DEPLOYMENT'

