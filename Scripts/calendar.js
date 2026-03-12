// Calendar-specific JavaScript functions
// Enhanced calendar utilities and helper functions

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
            description: eventData.description || '',
            extendedProps: {
                description: eventData.description || ''
            }
        };
    },
    
    // Validate event dates
    validateEventDates: function(startDate, endDate) {
        if (!startDate) return { valid: false, message: 'Fecha de inicio requerida' };
        
        const start = new Date(startDate);
        const now = new Date();
        
        // Check if start date is in the past (only for new events)
        if (start < now && Math.abs(start - now) > (24 * 60 * 60 * 1000)) {
            return { valid: false, message: 'La fecha de inicio no puede ser anterior a ayer' };
        }
        
        if (endDate && new Date(startDate) >= new Date(endDate)) {
            return { valid: false, message: 'La fecha de fin debe ser posterior a la fecha de inicio' };
        }
        
        return { valid: true };
    },
    
    // Format date for display
    formatEventDate: function(date, allDay = false) {
        const d = new Date(date);
        if (allDay) {
            return d.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        return d.toLocaleString('es-ES', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    // Calculate event duration
    getEventDuration: function(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffMs = end - start;
        const diffHours = Math.round(diffMs / (1000 * 60 * 60));
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays >= 1) {
            return `${diffDays} día${diffDays > 1 ? 's' : ''}`;
        } else {
            return `${diffHours} hora${diffHours > 1 ? 's' : ''}`;
        }
    },
    
    // Get events for a specific date
    getEventsForDate: function(date, events) {
        const targetDate = new Date(date).toDateString();
        return events.filter(event => {
            const eventDate = new Date(event.start).toDateString();
            return eventDate === targetDate;
        });
    },
    
    // Highlight search terms in text
    highlightSearchTerm: function(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    },
    
    // Get next available time slot
    getNextAvailableSlot: function(date, events) {
        const baseDate = new Date(date);
        const dayEvents = this.getEventsForDate(date, events);
        
        // Sort events by start time
        dayEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
        
        // Start checking from 9 AM
        let proposedStart = new Date(baseDate);
        proposedStart.setHours(9, 0, 0, 0);
        
        for (let event of dayEvents) {
            const eventStart = new Date(event.start);
            const eventEnd = event.end ? new Date(event.end) : new Date(eventStart.getTime() + (60 * 60 * 1000));
            
            // If proposed time conflicts with existing event, move after it
            if (proposedStart >= eventStart && proposedStart < eventEnd) {
                proposedStart = new Date(eventEnd.getTime() + (15 * 60 * 1000)); // 15 minutes buffer
            }
        }
        
        const proposedEnd = new Date(proposedStart.getTime() + (60 * 60 * 1000)); // 1 hour duration
        
        return {
            start: proposedStart.toISOString().slice(0, 16),
            end: proposedEnd.toISOString().slice(0, 16)
        };
    },
    
    // Export events to different formats
    exportEvents: function(events, format = 'json') {
        switch (format.toLowerCase()) {
            case 'csv':
                return this.exportToCSV(events);
            case 'ics':
                return this.exportToICS(events);
            default:
                return JSON.stringify(events, null, 2);
        }
    },
    
    exportToCSV: function(events) {
        const headers = ['Título', 'Descripción', 'Fecha Inicio', 'Fecha Fin', 'Todo el Día', 'Color'];
        const rows = events.map(event => [
            event.title,
            event.description || '',
            this.formatEventDate(event.start),
            event.end ? this.formatEventDate(event.end) : '',
            event.allDay ? 'Sí' : 'No',
            event.backgroundColor || event.borderColor || '#007bff'
        ]);
        
        return [headers, ...rows].map(row => 
            row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
        ).join('\n');
    },
    
    exportToICS: function(events) {
        const formatICSDate = (date) => {
            return new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        
        let ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Calendar App//Calendar App//ES\n';
        
        events.forEach(event => {
            ics += 'BEGIN:VEVENT\n';
            ics += `UID:${event.id}@calendarapp.com\n`;
            ics += `DTSTART:${formatICSDate(event.start)}\n`;
            if (event.end) {
                ics += `DTEND:${formatICSDate(event.end)}\n`;
            }
            ics += `SUMMARY:${event.title}\n`;
            if (event.description) {
                ics += `DESCRIPTION:${event.description}\n`;
            }
            ics += 'END:VEVENT\n';
        });
        
        ics += 'END:VCALENDAR';
        return ics;
    }
};

// Event color options with enhanced color palette
window.EventColors = [
    { name: 'Azul', value: '#007bff', category: 'Trabajo' },
    { name: 'Verde', value: '#28a745', category: 'Personal' },
    { name: 'Rojo', value: '#dc3545', category: 'Urgente' },
    { name: 'Amarillo', value: '#ffc107', category: 'Recordatorio' },
    { name: 'Cian', value: '#17a2b8', category: 'Reunión' },
    { name: 'Púrpura', value: '#6f42c1', category: 'Evento' },
    { name: 'Naranja', value: '#fd7e14', category: 'Deadline' },
    { name: 'Turquesa', value: '#20c997', category: 'Social' },
    { name: 'Rosa', value: '#e83e8c', category: 'Familia' },
    { name: 'Índigo', value: '#6610f2', category: 'Educación' }
];

// Calendar keyboard shortcuts
window.CalendarShortcuts = {
    init: function() {
        $(document).on('keydown', this.handleKeydown);
    },
    
    handleKeydown: function(e) {
        // Only handle shortcuts when no input is focused
        if ($(e.target).is('input, textarea, select')) {
            return;
        }
        
        switch (e.key.toLowerCase()) {
            case 't':
                // Go to today
                if (window.calendar) {
                    window.calendar.today();
                }
                break;
            case 'm':
                // Month view
                if (window.calendar) {
                    window.calendar.changeView('dayGridMonth');
                }
                break;
            case 'w':
                // Week view
                if (window.calendar) {
                    window.calendar.changeView('timeGridWeek');
                }
                break;
            case 'd':
                // Day view
                if (window.calendar) {
                    window.calendar.changeView('timeGridDay');
                }
                break;
            case 'l':
                // List view
                if (window.calendar) {
                    window.calendar.changeView('listWeek');
                }
                break;
            case 'arrowleft':
                // Previous
                if (window.calendar) {
                    window.calendar.prev();
                }
                e.preventDefault();
                break;
            case 'arrowright':
                // Next
                if (window.calendar) {
                    window.calendar.next();
                }
                e.preventDefault();
                break;
            case '/':
                // Focus search
                $('#searchEvents').focus();
                e.preventDefault();
                break;
        }
    }
};

// Notification system for events
window.EventNotifications = {
    checkUpcomingEvents: function(events) {
        const now = new Date();
        const in15Minutes = new Date(now.getTime() + (15 * 60 * 1000));
        
        events.forEach(event => {
            const eventStart = new Date(event.start);
            
            // Notify for events starting in 15 minutes
            if (eventStart > now && eventStart <= in15Minutes) {
                this.showEventReminder(event);
            }
        });
    },
    
    showEventReminder: function(event) {
        if (Notification.permission === 'granted') {
            new Notification(`Evento próximo: ${event.title}`, {
                body: `Comienza en 15 minutos${event.description ? ': ' + event.description : ''}`,
                icon: '/favicon.ico',
                badge: '/favicon.ico'
            });
        }
        
        // Also show in-app notification
        if (typeof window.showToast === 'function') {
            window.showToast(`Recordatorio: "${event.title}" comienza en 15 minutos`, 'info');
        }
    },
    
    requestPermission: function() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
};

// Initialize enhanced features when document is ready
$(document).ready(function() {
    // Initialize keyboard shortcuts
    CalendarShortcuts.init();
    
    // Request notification permission
    EventNotifications.requestPermission();
    
    // Check for upcoming events every minute
    setInterval(function() {
        if (window.allEvents) {
            EventNotifications.checkUpcomingEvents(window.allEvents);
        }
    }, 60000);
    
    console.log('Enhanced Calendar features initialized');
});