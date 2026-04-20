import tkinter as tk
from tkinter import messagebox
import pymysql
from pymysql.cursors import DictCursor
import paho.mqtt.client as mqtt

# MQTT Config
MQTT_BROKER = "broker.emqx.io"  # Replace with your broker if needed
MQTT_PORT = 1883
MQTT_TOPIC = "loadserver/relayctrl"

# Control flag for loop
polling = False

def publish_status(status):
    client = mqtt.Client()
    try:
        client.connect(MQTT_BROKER, MQTT_PORT, 60)
        client.publish(MQTT_TOPIC, status)
        client.disconnect()
        print(f"Published status '{status}' to {MQTT_TOPIC}")
    except Exception as e:
        messagebox.showerror("MQTT Error", f"Failed to publish: {e}")

def check_and_publish():
    try:
        conn = pymysql.connect(
            host="srv1113.hstgr.io",
            user="u858168866_usrsecure",
            password="0*cUn*bC9Xa",
            database="u858168866_secureiot",
            cursorclass=DictCursor
        )
        cursor = conn.cursor()

        # Get last record from toggle
        cursor.execute("SELECT * FROM toggle where action='N' ORDER BY id DESC LIMIT 1")
        last_record = cursor.fetchone()

        if last_record:
            deviceId = last_record.get("deviceId")
            status_value = last_record.get("status")
            print('Status value ' , status_value)
            cursor.execute(f"update toggle set action='Y' where deviceId='{deviceId}'")
            conn.commit()
            # Check if user is approved
            cursor.execute(f"SELECT status FROM users WHERE deviceId = '{deviceId}'")
            user_record = cursor.fetchone()
            if status_value==0:
                print('ON SENT')
                cmd = "0"
            else:
                print('OFF SENT')
                cmd = "1"
        
            if user_record.get("status") == "Y":
                publish_status(f"{cmd}")
                print(f"User {deviceId} approved & command sent")
            else:
                print(f"User {deviceId} not approved or not found.")
        else:
            print("No toggle records found.")

    except pymysql.MySQLError as err:
        print(f"Database error: {err}")
    finally:
        if conn:
            cursor.close()
            conn.close()

    # Call again after 5 seconds if polling is active
    if polling:
        app.after(5000, check_and_publish)

def on_start_click():
    global polling
    if not polling:
        polling = True
        check_and_publish()
        messagebox.showinfo("Started", "Polling started...")

def on_stop_click():
    global polling
    polling = False
    messagebox.showinfo("Stopped", "Polling has been stopped.")

# GUI Setup
app = tk.Tk()
app.title("IoT Relay Controller")
app.geometry("400x250")

title_label = tk.Label(app, text="IoT Relay Controller", font=('Arial', 18))
title_label.pack(pady=20)

start_button = tk.Button(app, text="Start", command=on_start_click, font=('Arial', 14), width=15, bg="green", fg="white")
start_button.pack(pady=10)

stop_button = tk.Button(app, text="Stop", command=on_stop_click, font=('Arial', 14), width=15, bg="red", fg="white")
stop_button.pack(pady=10)

app.mainloop()