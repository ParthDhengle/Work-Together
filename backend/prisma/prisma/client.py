# -*- coding: utf-8 -*-
# code generated by Prisma. DO NOT EDIT.
# pyright: reportUnusedImport=false
# fmt: off
from __future__ import annotations

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
# -- template client.py.jinja --
import warnings
import logging
from datetime import timedelta
from pathlib import Path
from types import TracebackType
from typing_extensions import override

from pydantic import BaseModel

from . import types, models, errors, actions
from ._base_client import BasePrisma, UseClientDefault, USE_CLIENT_DEFAULT
from .types import DatasourceOverride, HttpConfig, MetricsFormat
from ._types import BaseModelT, PrismaMethod, TransactionId, Datasource
from .bases import _PrismaModel
from ._builder import QueryBuilder, dumps
from .generator.models import EngineType, OptionalValueFromEnvVar, BinaryPaths
from ._compat import removeprefix, model_parse
from ._constants import CREATE_MANY_SKIP_DUPLICATES_UNSUPPORTED, DEFAULT_CONNECT_TIMEOUT, DEFAULT_TX_MAX_WAIT, DEFAULT_TX_TIMEOUT
from ._raw_query import deserialize_raw_results
from ._metrics import Metrics
from .metadata import PRISMA_MODELS, RELATIONAL_FIELD_MAPPINGS
from ._transactions import AsyncTransactionManager, SyncTransactionManager

# re-exports
from ._base_client import SyncBasePrisma, AsyncBasePrisma, load_env as load_env
from ._registry import (
    register as register,
    get_client as get_client,
    RegisteredClient as RegisteredClient,
)


__all__ = (
    'ENGINE_TYPE',
    'SCHEMA_PATH',
    'BINARY_PATHS',
    'Batch',
    'Prisma',
    'Client',
    'load_env',
    'register',
    'get_client',
)

log: logging.Logger = logging.getLogger(__name__)

SCHEMA_PATH = Path('/home/parth-dhengle/Documents/GitHub/Work-Together/backend/prisma/schema.prisma')
PACKAGED_SCHEMA_PATH = Path(__file__).parent.joinpath('schema.prisma')
ENGINE_TYPE: EngineType = EngineType.binary
BINARY_PATHS = model_parse(BinaryPaths, {'queryEngine': {'debian-openssl-3.0.x': '/home/parth-dhengle/.npm/_npx/55ad0b431757dc30/node_modules/prisma/query-engine-debian-openssl-3.0.x'}, 'introspectionEngine': {}, 'migrationEngine': {}, 'libqueryEngine': {}, 'prismaFmt': {}})


class Prisma(AsyncBasePrisma):
    # Note: these property names can be customised using `/// @Python(instance_name: '...')`
    # https://prisma-client-py.readthedocs.io/en/stable/reference/schema-extensions/#instance_name
    project: 'actions.ProjectActions[models.Project]'
    task: 'actions.TaskActions[models.Task]'
    worker: 'actions.WorkerActions[models.Worker]'
    assignment: 'actions.AssignmentActions[models.Assignment]'
    log: 'actions.LogActions[models.Log]'

    __slots__ = (
        'project',
        'task',
        'worker',
        'assignment',
        'log',
    )

    def __init__(
        self,
        *,
        use_dotenv: bool = True,
        log_queries: bool = False,
        auto_register: bool = False,
        datasource: DatasourceOverride | None = None,
        connect_timeout: int | timedelta = DEFAULT_CONNECT_TIMEOUT,
        http: HttpConfig | None = None,
    ) -> None:
        super().__init__(
            http=http,
            use_dotenv=use_dotenv,
            log_queries=log_queries,
            datasource=datasource,
            connect_timeout=connect_timeout,
        )
        self._set_generated_properties(
            schema_path=SCHEMA_PATH,
            engine_type=ENGINE_TYPE,
            prisma_models=PRISMA_MODELS,
            packaged_schema_path=PACKAGED_SCHEMA_PATH,
            relational_field_mappings=RELATIONAL_FIELD_MAPPINGS,
            preview_features=set([]),
            active_provider='postgresql',
            default_datasource_name='db',
        )

        self.project = actions.ProjectActions[models.Project](self, models.Project)
        self.task = actions.TaskActions[models.Task](self, models.Task)
        self.worker = actions.WorkerActions[models.Worker](self, models.Worker)
        self.assignment = actions.AssignmentActions[models.Assignment](self, models.Assignment)
        self.log = actions.LogActions[models.Log](self, models.Log)

        if auto_register:
            register(self)

    @property
    @override
    def _default_datasource(self) -> Datasource:
        return {
            'name': 'db',
            'url': OptionalValueFromEnvVar(**{'value': None, 'fromEnvVar': 'DATABASE_URL'}).resolve(),
            'source_file_path': '/home/parth-dhengle/Documents/GitHub/Work-Together/backend/prisma/schema.prisma',
        }

    async def execute_raw(self, query: LiteralString, *args: Any) -> int:
        resp = await self._execute(
            method='execute_raw',
            arguments={
                'query': query,
                'parameters': args,
            },
            model=None,
        )
        return int(resp['data']['result'])

    @overload
    async def query_first(
        self,
        query: LiteralString,
        *args: Any,
    ) -> dict[str, Any]:
        ...

    @overload
    async def query_first(
        self,
        query: LiteralString,
        *args: Any,
        model: Type[BaseModelT],
    ) -> Optional[BaseModelT]:
        ...

    async def query_first(
        self,
        query: LiteralString,
        *args: Any,
        model: Optional[Type[BaseModelT]] = None,
    ) -> Union[Optional[BaseModelT], dict[str, Any]]:
        """This function is the exact same as `query_raw()` but returns the first result.

        If model is given, the returned record is converted to the pydantic model first,
        otherwise a raw dictionary will be returned.
        """
        results: Sequence[Union[BaseModelT, dict[str, Any]]]
        if model is not None:
            results = await self.query_raw(query, *args, model=model)
        else:
            results = await self.query_raw(query, *args)

        if not results:
            return None

        return results[0]

    @overload
    async def query_raw(
        self,
        query: LiteralString,
        *args: Any,
    ) -> List[dict[str, Any]]:
        ...

    @overload
    async def query_raw(
        self,
        query: LiteralString,
        *args: Any,
        model: Type[BaseModelT],
    ) -> List[BaseModelT]:
        ...

    async def query_raw(
        self,
        query: LiteralString,
        *args: Any,
        model: Optional[Type[BaseModelT]] = None,
    ) -> Union[List[BaseModelT], List[dict[str, Any]]]:
        """Execute a raw SQL query against the database.

        If model is given, each returned record is converted to the pydantic model first,
        otherwise results will be raw dictionaries.
        """
        resp = await self._execute(
            method='query_raw',
            arguments={
                'query': query,
                'parameters': args,
            },
            model=model,
        )
        result = resp['data']['result']
        if model is not None:
            return deserialize_raw_results(result, model=model)

        return deserialize_raw_results(result)

    def batch_(self) -> Batch:
        """Returns a context manager for grouping write queries into a single transaction."""
        return Batch(client=self)

    def tx(
        self,
        *,
        max_wait: Union[int, timedelta] = DEFAULT_TX_MAX_WAIT,
        timeout: Union[int, timedelta] = DEFAULT_TX_TIMEOUT,
    ) -> TransactionManager:
        """Returns a context manager for executing queries within a database transaction.

        Entering the context manager returns a new Prisma instance wrapping all
        actions within a transaction, queries will be isolated to the Prisma instance and
        will not be commited to the database until the context manager exits.

        By default, Prisma will wait a maximum of 2 seconds to acquire a transaction from the database. You can modify this
        default with the `max_wait` argument which accepts a value in milliseconds or `datetime.timedelta`.

        By default, Prisma will cancel and rollback ay transactions that last longer than 5 seconds. You can modify this timeout
        with the `timeout` argument which accepts a value in milliseconds or `datetime.timedelta`.

        Example usage:

        ```py
        async with client.tx() as transaction:
            user1 = await client.user.create({'name': 'Robert'})
            user2 = await client.user.create({'name': 'Tegan'})
        ```

        In the above example, if the first database call succeeds but the second does not then neither of the records will be created.
        """
        return TransactionManager(
            client=self,
            max_wait=max_wait,
            timeout=timeout,
        )


TransactionManager = AsyncTransactionManager[Prisma]


# TODO: this should return the results as well
# TODO: don't require copy-pasting arguments between actions and batch actions
class Batch:
    project: 'ProjectBatchActions'
    task: 'TaskBatchActions'
    worker: 'WorkerBatchActions'
    assignment: 'AssignmentBatchActions'
    log: 'LogBatchActions'

    def __init__(self, client: Prisma) -> None:
        self.__client = client
        self.__queries: List[str] = []
        self._active_provider = client._active_provider
        self.project = ProjectBatchActions(self)
        self.task = TaskBatchActions(self)
        self.worker = WorkerBatchActions(self)
        self.assignment = AssignmentBatchActions(self)
        self.log = LogBatchActions(self)

    def _add(self, **kwargs: Any) -> None:
        builder = QueryBuilder(
            **kwargs,
            prisma_models=PRISMA_MODELS,
            relational_field_mappings=RELATIONAL_FIELD_MAPPINGS,
        )
        self.__queries.append(builder.build_query())

    async def commit(self) -> None:
        """Execute the queries"""
        # TODO: normalise this, we should still call client._execute
        queries = self.__queries
        self.__queries = []

        payload = {
            'batch': [
                {
                    'query': query,
                    'variables': {},
                }
                for query in queries
            ],
            'transaction': True,
        }
        await self.__client._engine.query(
            dumps(payload),
            tx_id=self.__client._tx_id,
        )

    def execute_raw(self, query: LiteralString, *args: Any) -> None:
        self._add(
            method='execute_raw',
            arguments={
                'query': query,
                'parameters': args,
            }
        )

    async def __aenter__(self) -> 'Batch':
        return self

    async def __aexit__(
        self,
        exc_type: Optional[Type[BaseException]],
        exc: Optional[BaseException],
        exc_tb: Optional[TracebackType],
    ) -> None:
        if exc is None:
            await self.commit()


# NOTE: some arguments are meaningless in this context but are included
# for completeness sake
class ProjectBatchActions:
    def __init__(self, batcher: Batch) -> None:
        self._batcher = batcher

    def create(
        self,
        data: types.ProjectCreateInput,
        include: Optional[types.ProjectInclude] = None
    ) -> None:
        self._batcher._add(
            method='create',
            model=models.Project,
            arguments={
                'data': data,
                'include': include,
            },
        )

    def create_many(
        self,
        data: List[types.ProjectCreateWithoutRelationsInput],
        *,
        skip_duplicates: Optional[bool] = None,
    ) -> None:
        if skip_duplicates and self._batcher._active_provider in CREATE_MANY_SKIP_DUPLICATES_UNSUPPORTED:
            raise errors.UnsupportedDatabaseError(self._batcher._active_provider, 'create_many_skip_duplicates')

        self._batcher._add(
            method='create_many',
            model=models.Project,
            arguments={
                'data': data,
                'skipDuplicates': skip_duplicates,
            },
            root_selection=['count'],
        )

    def delete(
        self,
        where: types.ProjectWhereUniqueInput,
        include: Optional[types.ProjectInclude] = None,
    ) -> None:
        self._batcher._add(
            method='delete',
            model=models.Project,
            arguments={
                'where': where,
                'include': include,
            },
        )

    def update(
        self,
        data: types.ProjectUpdateInput,
        where: types.ProjectWhereUniqueInput,
        include: Optional[types.ProjectInclude] = None
    ) -> None:
        self._batcher._add(
            method='update',
            model=models.Project,
            arguments={
                'data': data,
                'where': where,
                'include': include,
            },
        )

    def upsert(
        self,
        where: types.ProjectWhereUniqueInput,
        data: types.ProjectUpsertInput,
        include: Optional[types.ProjectInclude] = None,
    ) -> None:
        self._batcher._add(
            method='upsert',
            model=models.Project,
            arguments={
                'where': where,
                'include': include,
                'create': data.get('create'),
                'update': data.get('update'),
            },
        )

    def update_many(
        self,
        data: types.ProjectUpdateManyMutationInput,
        where: types.ProjectWhereInput,
    ) -> None:
        self._batcher._add(
            method='update_many',
            model=models.Project,
            arguments={'data': data, 'where': where,},
            root_selection=['count'],
        )

    def delete_many(
        self,
        where: Optional[types.ProjectWhereInput] = None,
    ) -> None:
        self._batcher._add(
            method='delete_many',
            model=models.Project,
            arguments={'where': where},
            root_selection=['count'],
        )



# NOTE: some arguments are meaningless in this context but are included
# for completeness sake
class TaskBatchActions:
    def __init__(self, batcher: Batch) -> None:
        self._batcher = batcher

    def create(
        self,
        data: types.TaskCreateInput,
        include: Optional[types.TaskInclude] = None
    ) -> None:
        self._batcher._add(
            method='create',
            model=models.Task,
            arguments={
                'data': data,
                'include': include,
            },
        )

    def create_many(
        self,
        data: List[types.TaskCreateWithoutRelationsInput],
        *,
        skip_duplicates: Optional[bool] = None,
    ) -> None:
        if skip_duplicates and self._batcher._active_provider in CREATE_MANY_SKIP_DUPLICATES_UNSUPPORTED:
            raise errors.UnsupportedDatabaseError(self._batcher._active_provider, 'create_many_skip_duplicates')

        self._batcher._add(
            method='create_many',
            model=models.Task,
            arguments={
                'data': data,
                'skipDuplicates': skip_duplicates,
            },
            root_selection=['count'],
        )

    def delete(
        self,
        where: types.TaskWhereUniqueInput,
        include: Optional[types.TaskInclude] = None,
    ) -> None:
        self._batcher._add(
            method='delete',
            model=models.Task,
            arguments={
                'where': where,
                'include': include,
            },
        )

    def update(
        self,
        data: types.TaskUpdateInput,
        where: types.TaskWhereUniqueInput,
        include: Optional[types.TaskInclude] = None
    ) -> None:
        self._batcher._add(
            method='update',
            model=models.Task,
            arguments={
                'data': data,
                'where': where,
                'include': include,
            },
        )

    def upsert(
        self,
        where: types.TaskWhereUniqueInput,
        data: types.TaskUpsertInput,
        include: Optional[types.TaskInclude] = None,
    ) -> None:
        self._batcher._add(
            method='upsert',
            model=models.Task,
            arguments={
                'where': where,
                'include': include,
                'create': data.get('create'),
                'update': data.get('update'),
            },
        )

    def update_many(
        self,
        data: types.TaskUpdateManyMutationInput,
        where: types.TaskWhereInput,
    ) -> None:
        self._batcher._add(
            method='update_many',
            model=models.Task,
            arguments={'data': data, 'where': where,},
            root_selection=['count'],
        )

    def delete_many(
        self,
        where: Optional[types.TaskWhereInput] = None,
    ) -> None:
        self._batcher._add(
            method='delete_many',
            model=models.Task,
            arguments={'where': where},
            root_selection=['count'],
        )



# NOTE: some arguments are meaningless in this context but are included
# for completeness sake
class WorkerBatchActions:
    def __init__(self, batcher: Batch) -> None:
        self._batcher = batcher

    def create(
        self,
        data: types.WorkerCreateInput,
        include: Optional[types.WorkerInclude] = None
    ) -> None:
        self._batcher._add(
            method='create',
            model=models.Worker,
            arguments={
                'data': data,
                'include': include,
            },
        )

    def create_many(
        self,
        data: List[types.WorkerCreateWithoutRelationsInput],
        *,
        skip_duplicates: Optional[bool] = None,
    ) -> None:
        if skip_duplicates and self._batcher._active_provider in CREATE_MANY_SKIP_DUPLICATES_UNSUPPORTED:
            raise errors.UnsupportedDatabaseError(self._batcher._active_provider, 'create_many_skip_duplicates')

        self._batcher._add(
            method='create_many',
            model=models.Worker,
            arguments={
                'data': data,
                'skipDuplicates': skip_duplicates,
            },
            root_selection=['count'],
        )

    def delete(
        self,
        where: types.WorkerWhereUniqueInput,
        include: Optional[types.WorkerInclude] = None,
    ) -> None:
        self._batcher._add(
            method='delete',
            model=models.Worker,
            arguments={
                'where': where,
                'include': include,
            },
        )

    def update(
        self,
        data: types.WorkerUpdateInput,
        where: types.WorkerWhereUniqueInput,
        include: Optional[types.WorkerInclude] = None
    ) -> None:
        self._batcher._add(
            method='update',
            model=models.Worker,
            arguments={
                'data': data,
                'where': where,
                'include': include,
            },
        )

    def upsert(
        self,
        where: types.WorkerWhereUniqueInput,
        data: types.WorkerUpsertInput,
        include: Optional[types.WorkerInclude] = None,
    ) -> None:
        self._batcher._add(
            method='upsert',
            model=models.Worker,
            arguments={
                'where': where,
                'include': include,
                'create': data.get('create'),
                'update': data.get('update'),
            },
        )

    def update_many(
        self,
        data: types.WorkerUpdateManyMutationInput,
        where: types.WorkerWhereInput,
    ) -> None:
        self._batcher._add(
            method='update_many',
            model=models.Worker,
            arguments={'data': data, 'where': where,},
            root_selection=['count'],
        )

    def delete_many(
        self,
        where: Optional[types.WorkerWhereInput] = None,
    ) -> None:
        self._batcher._add(
            method='delete_many',
            model=models.Worker,
            arguments={'where': where},
            root_selection=['count'],
        )



# NOTE: some arguments are meaningless in this context but are included
# for completeness sake
class AssignmentBatchActions:
    def __init__(self, batcher: Batch) -> None:
        self._batcher = batcher

    def create(
        self,
        data: types.AssignmentCreateInput,
        include: Optional[types.AssignmentInclude] = None
    ) -> None:
        self._batcher._add(
            method='create',
            model=models.Assignment,
            arguments={
                'data': data,
                'include': include,
            },
        )

    def create_many(
        self,
        data: List[types.AssignmentCreateWithoutRelationsInput],
        *,
        skip_duplicates: Optional[bool] = None,
    ) -> None:
        if skip_duplicates and self._batcher._active_provider in CREATE_MANY_SKIP_DUPLICATES_UNSUPPORTED:
            raise errors.UnsupportedDatabaseError(self._batcher._active_provider, 'create_many_skip_duplicates')

        self._batcher._add(
            method='create_many',
            model=models.Assignment,
            arguments={
                'data': data,
                'skipDuplicates': skip_duplicates,
            },
            root_selection=['count'],
        )

    def delete(
        self,
        where: types.AssignmentWhereUniqueInput,
        include: Optional[types.AssignmentInclude] = None,
    ) -> None:
        self._batcher._add(
            method='delete',
            model=models.Assignment,
            arguments={
                'where': where,
                'include': include,
            },
        )

    def update(
        self,
        data: types.AssignmentUpdateInput,
        where: types.AssignmentWhereUniqueInput,
        include: Optional[types.AssignmentInclude] = None
    ) -> None:
        self._batcher._add(
            method='update',
            model=models.Assignment,
            arguments={
                'data': data,
                'where': where,
                'include': include,
            },
        )

    def upsert(
        self,
        where: types.AssignmentWhereUniqueInput,
        data: types.AssignmentUpsertInput,
        include: Optional[types.AssignmentInclude] = None,
    ) -> None:
        self._batcher._add(
            method='upsert',
            model=models.Assignment,
            arguments={
                'where': where,
                'include': include,
                'create': data.get('create'),
                'update': data.get('update'),
            },
        )

    def update_many(
        self,
        data: types.AssignmentUpdateManyMutationInput,
        where: types.AssignmentWhereInput,
    ) -> None:
        self._batcher._add(
            method='update_many',
            model=models.Assignment,
            arguments={'data': data, 'where': where,},
            root_selection=['count'],
        )

    def delete_many(
        self,
        where: Optional[types.AssignmentWhereInput] = None,
    ) -> None:
        self._batcher._add(
            method='delete_many',
            model=models.Assignment,
            arguments={'where': where},
            root_selection=['count'],
        )



# NOTE: some arguments are meaningless in this context but are included
# for completeness sake
class LogBatchActions:
    def __init__(self, batcher: Batch) -> None:
        self._batcher = batcher

    def create(
        self,
        data: types.LogCreateInput,
        include: Optional[types.LogInclude] = None
    ) -> None:
        self._batcher._add(
            method='create',
            model=models.Log,
            arguments={
                'data': data,
                'include': include,
            },
        )

    def create_many(
        self,
        data: List[types.LogCreateWithoutRelationsInput],
        *,
        skip_duplicates: Optional[bool] = None,
    ) -> None:
        if skip_duplicates and self._batcher._active_provider in CREATE_MANY_SKIP_DUPLICATES_UNSUPPORTED:
            raise errors.UnsupportedDatabaseError(self._batcher._active_provider, 'create_many_skip_duplicates')

        self._batcher._add(
            method='create_many',
            model=models.Log,
            arguments={
                'data': data,
                'skipDuplicates': skip_duplicates,
            },
            root_selection=['count'],
        )

    def delete(
        self,
        where: types.LogWhereUniqueInput,
        include: Optional[types.LogInclude] = None,
    ) -> None:
        self._batcher._add(
            method='delete',
            model=models.Log,
            arguments={
                'where': where,
                'include': include,
            },
        )

    def update(
        self,
        data: types.LogUpdateInput,
        where: types.LogWhereUniqueInput,
        include: Optional[types.LogInclude] = None
    ) -> None:
        self._batcher._add(
            method='update',
            model=models.Log,
            arguments={
                'data': data,
                'where': where,
                'include': include,
            },
        )

    def upsert(
        self,
        where: types.LogWhereUniqueInput,
        data: types.LogUpsertInput,
        include: Optional[types.LogInclude] = None,
    ) -> None:
        self._batcher._add(
            method='upsert',
            model=models.Log,
            arguments={
                'where': where,
                'include': include,
                'create': data.get('create'),
                'update': data.get('update'),
            },
        )

    def update_many(
        self,
        data: types.LogUpdateManyMutationInput,
        where: types.LogWhereInput,
    ) -> None:
        self._batcher._add(
            method='update_many',
            model=models.Log,
            arguments={'data': data, 'where': where,},
            root_selection=['count'],
        )

    def delete_many(
        self,
        where: Optional[types.LogWhereInput] = None,
    ) -> None:
        self._batcher._add(
            method='delete_many',
            model=models.Log,
            arguments={'where': where},
            root_selection=['count'],
        )



Client = Prisma