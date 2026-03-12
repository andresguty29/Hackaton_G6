# Calendar App - Sistema de Gestión de Eventos

Una aplicación web moderna para la gestión de eventos con calendario interactivo construida con ASP.NET MVC 5.

## 🚀 Tecnologías Utilizadas

### Backend
- **ASP.NET MVC 5** (C#)
- **.NET Framework 4.8**
- **Entity Framework 6** (preparado para base de datos)
- **Newtonsoft.Json** para serialización JSON

### Frontend
- **jQuery 3.7.1** para manipulación del DOM y AJAX
- **Bootstrap 5** para diseño responsive y componentes UI
- **FullCalendar.js v6** para interfaz de calendario interactivo
- **SweetAlert2** para alertas y confirmaciones elegantes
- **Animate.css** para animaciones
- **Font Awesome 6** para iconografía

### Persistencia
- **Sesión del navegador** (memoria temporal)
- Estructura preparada para base de datos SQL Server
- Archivos JSON como alternativa de persistencia

## 📋 Características

### ✅ Gestión Completa de Eventos
- ✓ **Vista mensual por defecto** - Visualización inicial al cargar la aplicación
- ✓ **Crear eventos** - Click en día vacío abre modal con formulario completo
- ✓ **Ver detalles** - Click en evento existente muestra información completa
- ✓ **Editar eventos** - Modificación de todos los campos desde el detalle
- ✓ **Eliminar eventos** - Confirmación visual elegante (SweetAlert2)
- ✓ **Drag & Drop** - Arrastra eventos para cambiar fechas automáticamente
- ✓ **Resize de eventos** - Redimensiona arrastrando bordes para cambiar duración
- ✓ **Eventos de todo el día** - Soporte completo para eventos sin horario específico

### ✅ Vistas y Navegación
- ✓ **Vista semanal y diaria** - Toggle desde la UI con botones dedicados
- ✓ **Vista de lista** - Listado cronológico de eventos
- ✓ **Navegación con teclado** - Atajos para cambiar vistas y navegar
- ✓ **Botón "Hoy"** - Regreso rápido a la fecha actual

### ✅ Funcionalidades Avanzadas de Búsqueda y Filtrado
- ✓ **Búsqueda de eventos por título/descripción** - Búsqueda en tiempo real
- ✓ **Filtro por colores/categorías** - Dropdown con opciones de filtrado
- ✓ **Búsqueda con teclado** - Atajo "/" para enfocar búsqueda
- ✓ **Limpiar filtros** - Botones para resetear búsqueda y filtros

### ✅ Indicadores Visuales Avanzados
- ✓ **Contador de eventos múltiples** - Indicador numérico en días con muchos eventos
- ✓ **"+X más" en días ocupados** - FullCalendar maneja overflow elegantemente
- ✓ **Tooltips informativos** - Información al pasar mouse sobre eventos
- ✓ **Animaciones suaves** - Transiciones y efectos visuales
- ✓ **Highlighting de búsqueda** - Términos de búsqueda resaltados

### ✅ Experiencia de Usuario Premium
- ✓ **Atajos de teclado completos** - Navegación sin mouse
- ✓ **Notificaciones de recordatorio** - Alerts 15 minutos antes de eventos
- ✓ **Validación avanzada** - Validación en tiempo real con mensajes específicos
- ✓ **Feedback visual inmediato** - Toast notifications y alerts elegantes
- ✓ **Modal de ayuda** - Guía completa de atajos y funcionalidades
- ✓ **Diseño responsive** - Optimizado para móviles y tablets

### ✅ Personalización y Colores
- ✓ **10 colores predefinidos** - Paleta ampliada con categorías
- ✓ **Categorización por colores** - Sistema de categorías integrado
- ✓ **Eventos con estilo diferenciado** - Estilos únicos para eventos de todo el día
- ✓ **Temas graduales** - Gradientes y efectos visuales modernos

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Visual Studio 2019 o superior
- .NET Framework 4.8
- IIS Express (incluido con Visual Studio)

### ⚠️ Configuración de Codificación UTF-8
El proyecto está configurado para manejar correctamente caracteres especiales (tildes, ñ, etc.):

- **Web.config**: Configurado con `globalization` para UTF-8
- **Global.asax**: Configuración automática de codificación UTF-8
- **Filtro Global**: `Utf8ActionFilterAttribute` aplica UTF-8 a todas las respuestas
- **HTML Meta Tags**: Etiquetas meta correctas para UTF-8
- **.gitattributes**: Fuerzar codificación UTF-8 en todos los archivos fuente

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd CalendarApp
   ```

2. **Abrir la solución**
   ```bash
   # Abrir desde Visual Studio
   CalendarApp.sln
   
   # O desde línea de comandos
   devenv CalendarApp.sln
   ```

3. **Restaurar paquetes NuGet**
   ```bash
   # Desde Package Manager Console en Visual Studio
   Update-Package -Reinstall
   ```

4. **Compilar la aplicación**
   ```bash
   # Desde Visual Studio: Build > Rebuild Solution
   # O desde línea de comandos
   msbuild CalendarApp.sln /p:Configuration=Debug
   ```

5. **Ejecutar la aplicación**
   - Presionar F5 en Visual Studio
   - O hacer clic en IIS Express
   - La aplicación se abrirá en el navegador predeterminado

## 📁 Estructura del Proyecto

```
CalendarApp/
├── App_Start/
│   ├── BundleConfig.cs      # Configuración de bundles CSS/JS
│   ├── FilterConfig.cs      # Filtros globales
│   └── RouteConfig.cs       # Configuración de rutas
├── Controllers/
│   ├── HomeController.cs    # Controlador principal
│   └── CalendarController.cs # Controlador del calendario
├── Models/
│   ├── Event.cs            # Modelo de evento
│   └── EventViewModel.cs   # ViewModel para formularios
├── Services/
│   └── EventService.cs     # Servicio de gestión de eventos
├── Views/
│   ├── Shared/
│   │   └── _Layout.cshtml  # Layout principal
│   ├── Home/
│   │   └── About.cshtml    # Página de información
│   ├── Calendar/
│   │   └── Index.cshtml    # Vista principal del calendario
│   ├── _ViewStart.cshtml   # Configuración de layout
│   └── web.config          # Configuración de vistas
├── Content/               # Archivos CSS
├── Scripts/              # Archivos JavaScript
├── App_Data/             # Datos de la aplicación
├── Properties/
│   └── AssemblyInfo.cs   # Información del ensamblado
├── Web.config           # Configuración principal
├── Global.asax         # Configuración global
├── packages.config     # Paquetes NuGet
└── README.md          # Esta documentación
```

## 🔧 Configuración

### Base de Datos (Opcional)
El proyecto está preparado para usar SQL Server. Para habilitarlo:

1. **Modificar Web.config**
   ```xml
   <connectionStrings>
     <add name="DefaultConnection" 
          connectionString="Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=CalendarApp;Integrated Security=true;" 
          providerName="System.Data.SqlClient" />
   </connectionStrings>
   ```

2. **Crear servicio de base de datos**
   - Implementar `DatabaseEventService` que herede de `IEventService`
   - Usar Entity Framework para operaciones CRUD

### Personalización

#### Cambiar colores del tema
Editar variables CSS en `_Layout.cshtml`:
```css
:root {
    --primary-color: #007bff;
    --success-color: #28a745;
    --warning-color: #ffc107;
    --danger-color: #dc3545;
}
```

#### Agregar nuevos tipos de persistencia
1. Crear nueva clase que implemente `IEventService`
2. Registrar en el constructor de `CalendarController`

## 🎯 Uso de la Aplicación

### Crear un Evento
1. Hacer clic en "Nuevo Evento" o en una fecha del calendario
2. Llenar el formulario con título, descripción, fechas y color
3. Hacer clic en "Guardar"

### Editar un Evento
1. Hacer clic en el evento en el calendario
2. Modificar los campos necesarios
3. Hacer clic en "Guardar"

### Mover un Evento
- Arrastrar y soltar el evento a la nueva fecha
- Redimensionar arrastrando los bordes para cambiar duración

### Eliminar un Evento
1. Hacer clic en el evento
2. Hacer clic en "Eliminar"
3. Confirmar la eliminación en el diálogo elegante

### Búsqueda y Filtrado
- **Buscar eventos**: Usar la caja de búsqueda en la parte superior
- **Filtrar por color**: Usar el dropdown "Filtrar" 
- **Limpiar filtros**: Click en "Todos los eventos" o botón X en búsqueda

### Atajos de Teclado
- **Ctrl/Cmd + N**: Crear nuevo evento
- **T**: Ir a hoy
- **M**: Vista mensual  
- **W**: Vista semanal
- **D**: Vista diaria
- **L**: Vista de lista
- **←/→**: Navegación anterior/siguiente
- **/**: Enfocar búsqueda
- **Esc**: Cerrar modal/limpiar búsqueda

## 🚀 Características Avanzadas

### API REST
El controlador `CalendarController` expone endpoints JSON:
- `GET /Calendar/GetEvents` - Obtener eventos
- `POST /Calendar/CreateEvent` - Crear evento
- `POST /Calendar/UpdateEvent` - Actualizar evento
- `POST /Calendar/DeleteEvent` - Eliminar evento
- `GET /Calendar/GetEvent/{id}` - Obtener evento específico
- `POST /Calendar/MoveEvent` - Mover evento

### Validación
- Validación en cliente con jQuery
- Validación en servidor con Data Annotations
- Mensajes de error personalizados

### Responsive Design
- Compatible con dispositivos móviles
- Interfaz adaptativa usando Bootstrap 5
- Touch-friendly en pantallas táctiles

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para la feature (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas:

### Problemas Comunes

#### Caracteres especiales (tildes, ñ) no se muestran correctamente
- ✅ **Solución aplicada**: El proyecto incluye configuración completa UTF-8
- ✅ Configuración en `Web.config` con `globalization`
- ✅ Filtro global `Utf8ActionFilterAttribute`
- ✅ Meta tags HTML correctos
- ✅ Codificación forzada en respuestas JSON

#### Si persisten problemas de codificación:
1. Verificar que Visual Studio guarde archivos en UTF-8
2. Limpiar y reconstruir la solución
3. Verificar configuración del navegador
4. Asegurar que IIS Express use UTF-8

### Otras consultas:
1. Revisar la documentación
2. Abrir un issue en GitHub
3. Contactar al equipo de desarrollo

---

**Desarrollado con ❤️ usando ASP.NET MVC 5**