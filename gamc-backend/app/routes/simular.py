from fastapi import APIRouter
from Simulador.SimuladorSonido.simulador_sonido import generar_y_guardar_un_registro
import threading
import time

router = APIRouter()

# Flag para controlar la simulación automática
simulacion_activa = False
simulacion_thread = None

def simulacion_automatica():
    """Ejecuta la simulación cada 2 segundos mientras simulacion_activa sea True."""
    global simulacion_activa
    while simulacion_activa:
        registro = generar_y_guardar_un_registro()
        print(f"[Simulador] Registro generado: LAeq={registro['Object.laeq']} dB, Status={registro['Object.status']}")
        time.sleep(2)  # Espera 2 segundos entre cada registro

@router.get("/")
def iniciar_simulacion_get():
    """
    Inicia la simulación automáticamente al hacer GET en la ruta /api/simular
    """
    global simulacion_activa, simulacion_thread
    if not simulacion_activa:
        simulacion_activa = True
        # Creamos un hilo nuevo para la simulación
        simulacion_thread = threading.Thread(target=simulacion_automatica, daemon=True)
        simulacion_thread.start()
        return {"status": "Simulación automática iniciada"}
    else:
        return {"status": "La simulación ya estaba en ejecución"}

@router.get("/detener")
def detener_simulacion_get():
    """
    Detiene la simulación automáticamente al hacer GET en la ruta /api/simular/detener
    """
    global simulacion_activa
    if simulacion_activa:
        simulacion_activa = False
        return {"status": "Simulación automática detenida"}
    else:
        return {"status": "La simulación ya estaba detenida"}
