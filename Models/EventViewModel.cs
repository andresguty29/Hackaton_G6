using System;
using System.ComponentModel.DataAnnotations;

namespace CalendarApp.Models
{
    public class EventViewModel
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "El título es requerido")]
        [Display(Name = "Título")]
        public string Title { get; set; }
        
        [Display(Name = "Descripción")]
        public string Description { get; set; }
        
        [Required(ErrorMessage = "La fecha de inicio es requerida")]
        [Display(Name = "Fecha de Inicio")]
        [DataType(DataType.DateTime)]
        public DateTime Start { get; set; }
        
        [Display(Name = "Fecha de Fin")]
        [DataType(DataType.DateTime)]
        public DateTime? End { get; set; }
        
        [Display(Name = "Todo el día")]
        public bool AllDay { get; set; }
        
        [Display(Name = "Color")]
        public string Color { get; set; } = "#007bff";
    }
}