import { Model, UUID, UUIDV4 } from 'sequelize';
import sequelize from '../db';
import User from './user.model';

class Follow extends Model {
  public id!: string;
  public followerId!: string;
  public followingId!: string;
}

Follow.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    followerId: {
      type: UUID,
    },
    followingId: {
      type: UUID,
    },
  },
  {
    sequelize,
    tableName: 'follows',
    indexes: [{ unique: true, fields: ['followerId', 'followingId'] }],
  }
);

User.belongsToMany(User, {
  through: 'follows',
  as: 'follower',
  foreignKey: 'followerId',
});

User.belongsToMany(User, {
  through: 'follows',
  as: 'following',
  foreignKey: 'followerId',
});

Follow.belongsTo(User, { as: 'follower', onDelete: 'CASCADE' });
Follow.belongsTo(User, { as: 'following', onDelete: 'CASCADE' });

Follow.sync({ alter: true });

export default Follow;
