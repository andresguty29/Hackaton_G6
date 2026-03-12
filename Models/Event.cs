using System;
using System.ComponentModel.DataAnnotations;

namespace CalendarApp.Models
{
    public class Event
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "El título es requerido")]
        [StringLength(200, ErrorMessage = "El título no puede exceder 200 caracteres")]
        public string Title { get; set; }
        
        [StringLength(1000, ErrorMessage = "La descripción no puede exceder 1000 caracteres")]
        public string Description { get; set; }
        
        [Required(ErrorMessage = "La fecha de inicio es requerida")]
        public DateTime Start { get; set; }
        
        public DateTime? End { get; set; }
        
        public bool AllDay { get; set; }
        
        [StringLength(7, ErrorMessage = "El color debe ser un código hexadecimal válido")]
        public string Color { get; set; }
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime? UpdatedAt { get; set; }
    }
}