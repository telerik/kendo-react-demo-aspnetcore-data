#nullable disable
using System.ComponentModel.DataAnnotations;

namespace ReactWithRestApi.Server.Models;

public class CustomerEntity
{
    [Key]
    public uint Id { get; set; }

    public string Name { get; set; }

    public int Age { get; set; }

    public DateTime DateOfBirth { get; set; }
}