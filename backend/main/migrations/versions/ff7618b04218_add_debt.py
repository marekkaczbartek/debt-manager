"""add debt

Revision ID: ff7618b04218
Revises: 3396ddeaed97
Create Date: 2024-06-02 13:42:19.391736

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ff7618b04218'
down_revision = '3396ddeaed97'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bill')
    with op.batch_alter_table('debt', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('user_owing_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('debt', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_owing_id', sa.INTEGER(), nullable=False))
        batch_op.create_foreign_key(None, 'user', ['user_owing_id'], ['id'])

    op.create_table('bill',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('amount', sa.FLOAT(), nullable=False),
    sa.Column('description', sa.VARCHAR(length=255), nullable=False),
    sa.Column('date', sa.DATETIME(), nullable=False),
    sa.Column('group_id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['group_id'], ['group.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###