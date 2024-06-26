"""new migration

Revision ID: 6c0b880c59e2
Revises: d08f341b9685
Create Date: 2024-06-18 10:21:57.161875

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6c0b880c59e2'
down_revision = 'd08f341b9685'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('debt_user',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('debt_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['debt_id'], ['debt.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('debt_user')
    # ### end Alembic commands ###
