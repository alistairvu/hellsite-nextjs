import { Model, DataTypes, UUID, UUIDV4 } from 'sequelize';
import sequelize from '../db';

class Post extends Model {
  public id!: string;
  public content!: string;
  public userId!: string;
}

Post.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: UUID,
    },
  },
  { sequelize, tableName: 'posts' }
);

Post.sync({ alter: true });

export default Post;
