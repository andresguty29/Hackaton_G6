// Calendar-specific JavaScript functions
// Note: Main calendar functionality is in the Calendar/Index.cshtml view

// Calendar utility functions
window.CalendarUtils = {
    // Create event object for FullCalendar
    createEventObject: function(eventData) {
        return {
            id: eventData.id,
            title: eventData.title,
            start: eventData.start,
            end: eventData.end,
            allDay: eventData.allDay || false,
            backgroundColor: eventData.color || '#007bff',
            borderColor: eventData.color || '#007bff',
            description: eventData.description || ''
        };
    },
    
    // Validate event dates
    validateEventDates: function(startDate, endDate) {
        if (!startDate) return { valid: false, message: 'Fecha de inicio requerida' };
        
        if (endDate && new Date(startDate) >= new Date(endDate)) {
            return { valid: false, message: 'La fecha de fin debe ser posterior a la fecha de inicio' };
        }
        
        return { valid: true };
    },
    
    // Format date for display
    formatEventDate: function(date, allDay = false) {
        const d = new Date(date);
        if (allDay) {
            return d.toLocaleDateString('es-ES');
        }
        return d.toLocaleString('es-ES');
    }
};

// Event color options
window.EventColors = [
    { name: 'Azul', value: '#007bff' },
    { name: 'Verde', value: '#28a745' },
    { name: 'Rojo', value: '#dc3545' },
    { name: 'Amarillo', value: '#ffc107' },
    { name: 'Cian', value: '#17a2b8' },
    { name: 'Púrpura', value: '#6f42c1' },
    { name: 'Naranja', value: '#fd7e14' },
    { name: 'Turquesa', value: '#20c997' }
];