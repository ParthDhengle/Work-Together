import asyncpg

# Replace with your Neon Postgres URL
DATABASE_URL='postgresql://Work_owner:npg_aZjw0RtVE9Po@ep-white-leaf-a1frwrl5-pooler.ap-southeast-1.aws.neon.tech/Work?sslmode=require'

async def get_db_pool():
    return await asyncpg.create_pool(DATABASE_URL)