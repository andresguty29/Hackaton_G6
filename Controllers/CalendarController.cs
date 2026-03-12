using System;
using System.Linq;
using System.Web.Mvc;
using CalendarApp.Models;
using CalendarApp.Services;
using Newtonsoft.Json;

namespace CalendarApp.Controllers
{
    public class CalendarController : Controller
    {
        private readonly IEventService _eventService;

        public CalendarController()
        {
            _eventService = new SessionEventService();
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetEvents(DateTime? start = null, DateTime? end = null)
        {
            try
            {
                var events = _eventService.GetAllEvents();
                
                if (start.HasValue && end.HasValue)
                {
                    events = events.Where(e => e.Start >= start.Value && e.Start <= end.Value).ToList();
                }

                var calendarEvents = events.Select(e => new
                {
                    id = e.Id,
                    title = e.Title,
                    description = e.Description,
                    start = e.Start.ToString("yyyy-MM-ddTHH:mm:ss"),
                    end = e.End?.ToString("yyyy-MM-ddTHH:mm:ss"),
                    allDay = e.AllDay,
                    backgroundColor = e.Color,
                    borderColor = e.Color
                });

                return Json(calendarEvents, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult CreateEvent(EventViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                    return Json(new { success = false, errors = errors });
                }

                var eventItem = new Event
                {
                    Title = model.Title,
                    Description = model.Description,
                    Start = model.Start,
                    End = model.End,
                    AllDay = model.AllDay,
                    Color = model.Color
                };

                var eventId = _eventService.AddEvent(eventItem);
                
                return Json(new { 
                    success = true, 
                    id = eventId,
                    message = "Evento creado exitosamente" 
                });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult UpdateEvent(EventViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                    return Json(new { success = false, errors = errors });
                }

                var eventItem = new Event
                {
                    Id = model.Id,
                    Title = model.Title,
                    Description = model.Description,
                    Start = model.Start,
                    End = model.End,
                    AllDay = model.AllDay,
                    Color = model.Color
                };

                var result = _eventService.UpdateEvent(eventItem);
                
                if (result)
                {
                    return Json(new { success = true, message = "Evento actualizado exitosamente" });
                }
                else
                {
                    return Json(new { success = false, message = "Evento no encontrado" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult DeleteEvent(int id)
        {
            try
            {
                var result = _eventService.DeleteEvent(id);
                
                if (result)
                {
                    return Json(new { success = true, message = "Evento eliminado exitosamente" });
                }
                else
                {
                    return Json(new { success = false, message = "Evento no encontrado" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        public JsonResult GetEvent(int id)
        {
            try
            {
                var eventItem = _eventService.GetEvent(id);
                
                if (eventItem == null)
                {
                    return Json(new { success = false, message = "Evento no encontrado" }, JsonRequestBehavior.AllowGet);
                }

                var eventData = new
                {
                    id = eventItem.Id,
                    title = eventItem.Title,
                    description = eventItem.Description,
                    start = eventItem.Start.ToString("yyyy-MM-ddTHH:mm"),
                    end = eventItem.End?.ToString("yyyy-MM-ddTHH:mm"),
                    allDay = eventItem.AllDay,
                    color = eventItem.Color
                };

                return Json(new { success = true, data = eventData }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult MoveEvent(int id, DateTime start, DateTime? end)
        {
            try
            {
                var eventItem = _eventService.GetEvent(id);
                if (eventItem == null)
                {
                    return Json(new { success = false, message = "Evento no encontrado" });
                }

                eventItem.Start = start;
                eventItem.End = end;

                var result = _eventService.UpdateEvent(eventItem);
                
                if (result)
                {
                    return Json(new { success = true, message = "Evento movido exitosamente" });
                }
                else
                {
                    return Json(new { success = false, message = "Error al mover el evento" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}