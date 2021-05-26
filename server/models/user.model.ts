import {
  Model,
  DataTypes,
  UUID,
  UUIDV4,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyCountAssociationsMixin,
  Association,
} from 'sequelize';
import sequelize from '../db';
import Post from './post.model';

export class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public passwordDigest!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getPosts!: HasManyGetAssociationsMixin<Post>;
  public createPost!: HasManyCreateAssociationMixin<Post>;
  public countPosts!: HasManyCountAssociationsMixin;

  public readonly posts?: Post[];

  public static associations: {
    posts: Association<User, Post>;
  };
}

User.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordDigest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: 'users' }
);

User.sync({ alter: true });

User.hasMany(Post, { onDelete: 'cascade' });
Post.belongsTo(User);

export default User;
