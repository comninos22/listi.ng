import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.config';
import User from './user.model'; // Import the User model

export class Todo extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public completed!: boolean;
  public userId!: string; // Foreign key to reference the User model
}
Todo.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true, 
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: User, // Reference the User model
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Todo',
      tableName: 'todos',
      timestamps: true,
    }
  );

// Define the association between Todo and User
Todo.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Todo, { foreignKey: 'userId', as: 'todos' });

export default Todo;