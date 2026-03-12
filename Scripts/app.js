// Application JavaScript for Calendar App
$(document).ready(function() {
    // Global application initialization
    console.log('Calendar App initialized');
    
    // Global AJAX setup
    $.ajaxSetup({
        cache: false,
        beforeSend: function() {
            // Show loading indicator
            if (typeof window.showLoading === 'function') {
                window.showLoading();
            }
        },
        complete: function() {
            // Hide loading indicator
            if (typeof window.hideLoading === 'function') {
                window.hideLoading();
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX Error:', error);
            if (typeof window.showAlert === 'function') {
                window.showAlert('Error', 'Error de comunicación con el servidor', 'error');
            }
        }
    });
    
    // Prevent double-click form submission
    $('form').on('submit', function() {
        $(this).find('button[type="submit"]').prop('disabled', true);
        setTimeout(function() {
            $('button[type="submit"]').prop('disabled', false);
        }, 2000);
    });
});

// Global utility functions
window.Utils = {
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('es-ES');
    },
    formatDateTime: function(date) {
        return new Date(date).toLocaleString('es-ES');
    }
};