using PeopleManagementApi.Models;
using PeopleManagementApi.DTOs;

namespace PeopleManagementApi.Mappers
{
    public class TodoMappers{

        public static TodoDTO TodoToDTO(Todo todo) =>
            new()
        {
            Id = todo.Id,
            Name = todo.Name,
            EndDate = todo.EndDate,
            IsComplete = todo.IsComplete,
        };

        public static Todo DTOToTodo(TodoDTO todoDTO) =>
            new Todo
        {
            Id = todoDTO.Id,
            Name = todoDTO.Name,
            EndDate = todoDTO.EndDate,
            IsComplete = todoDTO.IsComplete,
        };
    }
}