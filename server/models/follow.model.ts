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
  foreignKey: 'followerId',
  otherKey: 'followingId',
});

User.belongsToMany(User, {
  through: 'follows',
  foreignKey: 'followingId',
  otherKey: 'followerId',
});

export default Follow;
