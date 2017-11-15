'use strict';

module.exports = function(sequelize, DataTypes){ 
    const Curso = sequelize.define('curso', {
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            field : 'id'},

        nome: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true},

        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true}
    }, {
        tableName: 'curso',
        freezeTableName: true
    });

    Curso.associate = function(models) {
            Curso.belongsToMany(models.faculdade, {
                through: models.cursoFaculdade,
                foreignKey: 'fk_id_curso',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        };
    
        
    return Curso;
};
