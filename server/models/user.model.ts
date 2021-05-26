import { Model, DataTypes, UUID, UUIDV4 } from 'sequelize';
import sequelize from '../db';
import Post from './post.model';

export class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public passwordDigest!: string;
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

User.hasMany(Post);
Post.belongsTo(User);

export default User;
