using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CalendarApp.Models;
using Newtonsoft.Json;

namespace CalendarApp.Services
{
    public interface IEventService
    {
        List<Event> GetAllEvents();
        Event GetEvent(int id);
        int AddEvent(Event eventItem);
        bool UpdateEvent(Event eventItem);
        bool DeleteEvent(int id);
    }

    public class SessionEventService : IEventService
    {
        private const string SESSION_KEY = "CalendarEvents";

        private List<Event> GetEventsFromSession()
        {
            var session = HttpContext.Current.Session[SESSION_KEY] as string;
            if (string.IsNullOrEmpty(session))
            {
                return new List<Event>();
            }
            return JsonConvert.DeserializeObject<List<Event>>(session);
        }

        private void SaveEventsToSession(List<Event> events)
        {
            HttpContext.Current.Session[SESSION_KEY] = JsonConvert.SerializeObject(events);
        }

        public List<Event> GetAllEvents()
        {
            return GetEventsFromSession();
        }

        public Event GetEvent(int id)
        {
            var events = GetEventsFromSession();
            return events.FirstOrDefault(e => e.Id == id);
        }

        public int AddEvent(Event eventItem)
        {
            var events = GetEventsFromSession();
            eventItem.Id = events.Any() ? events.Max(e => e.Id) + 1 : 1;
            eventItem.CreatedAt = DateTime.Now;
            events.Add(eventItem);
            SaveEventsToSession(events);
            return eventItem.Id;
        }

        public bool UpdateEvent(Event eventItem)
        {
            var events = GetEventsFromSession();
            var existingEvent = events.FirstOrDefault(e => e.Id == eventItem.Id);
            if (existingEvent == null) return false;

            existingEvent.Title = eventItem.Title;
            existingEvent.Description = eventItem.Description;
            existingEvent.Start = eventItem.Start;
            existingEvent.End = eventItem.End;
            existingEvent.AllDay = eventItem.AllDay;
            existingEvent.Color = eventItem.Color;
            existingEvent.UpdatedAt = DateTime.Now;

            SaveEventsToSession(events);
            return true;
        }

        public bool DeleteEvent(int id)
        {
            var events = GetEventsFromSession();
            var eventToRemove = events.FirstOrDefault(e => e.Id == id);
            if (eventToRemove == null) return false;

            events.Remove(eventToRemove);
            SaveEventsToSession(events);
            return true;
        }
    }
}