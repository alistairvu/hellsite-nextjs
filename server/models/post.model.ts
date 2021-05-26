import {
  Model,
  DataTypes,
  UUID,
  UUIDV4,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import sequelize from '../db';

class Post extends Model {
  public id!: string;
  public content!: string;
  public userId!: string;
  public repostId!: string;

  public createRepost!: HasManyCreateAssociationMixin<Post>;
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
    repostId: {
      type: UUID,
    },
  },
  { sequelize, tableName: 'posts' }
);

Post.hasMany(Post, { foreignKey: 'repostId' });

Post.sync({ alter: true });

export default Post;
