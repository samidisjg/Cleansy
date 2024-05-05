import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime
import requests
import time

url = 'http://localhost:5173/api/StaffAttendance/recognize-face'

time_now_temp = datetime.now()
file_name = time_now_temp.strftime('%d_%m_%Y.csv')
test = open(file_name, 'a+')

path = 'images'
images = []
personNames = []
x = []
s_details = []
myList = os.listdir(path)
for cu_img in myList:
    current_Img = cv2.imread(f'{path}/{cu_img}')
    images.append(current_Img)
    personNames.append(os.path.splitext(cu_img)[0])
for i in range(len(personNames)):
    x = personNames[i].split("_")
    s_details.append(x)

def faceEncodings(images):
    print("Encoding started, please wait for 30 seconds")
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList

def attendance(roll, name, time_type):
    with open(file_name, 'a+') as f:
        time_now = datetime.now()
        tStr = time_now.strftime('%H:%M:%S')
        dStr = time_now.strftime('%Y-%m-%d')
        data = {
            "rollno": roll,
            "name": name,
            "time": tStr,
            "date": dStr,
            "time_type": time_type  # Added time_type field
        }
        headers = {
            'Content-Type': 'application/json'
        }
        try:
            response = requests.post(url, headers=headers, json=data)
            if response.status_code == 200:
                print("Attendance recorded successfully!")
            else:
                print("Error:", response.text)

        except Exception as e:
            print("Error:", str(e))
            # Break out of the loop when an error occurs
            raise

encodeListKnown = faceEncodings(images)

print('All Encodings Complete!!!')
print("Starting camera")

# Check camera access
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: Unable to access camera")

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 320)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 240)

# Frame rate control
frame_rate = 3  # Adjust the frame rate as needed

try:
    while True:
        start_time = time.time()

        ret, frame = cap.read()
        if not ret:
            print("Error: Failed to capture frame")
            break

        faces = cv2.resize(frame, (0, 0), None, 0.5, 0.5)
        faces = cv2.cvtColor(faces, cv2.COLOR_BGR2RGB)

        facesCurrentFrame = face_recognition.face_locations(faces, model="cnn")
        encodesCurrentFrame = face_recognition.face_encodings(faces, facesCurrentFrame)

        print("Number of faces detected:", len(facesCurrentFrame))

        for encodeFace, faceLoc in zip(encodesCurrentFrame, facesCurrentFrame):
            matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
            faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
            matchIndex = np.argmin(faceDis)

            print("Matches:", matches)
            print("Match index:", matchIndex)

            if matches[matchIndex]:
                roll = s_details[matchIndex][0]
                name = s_details[matchIndex][1].upper()
                y1, x2, y2, x1 = faceLoc
                y1, x2, y2, x1 = y1 * 2, x2 * 2, y2 * 2, x1 * 2
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.rectangle(frame, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
                cv2.putText(frame, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

                # Prompt user for login/logout
                time_type = input("Login or Logout? (Type 'login' or 'logout'): ").lower()
                attendance(roll, name, time_type)

        cv2.imshow('Webcam', frame)
        
        # Prompt user if they want to mark another attendance
        another_attendance = input("Do you want to mark another attendance? (yes/no): ").lower()
        if another_attendance != 'yes':
            break

        if cv2.waitKey(1) == 3:
            break

        elapsed_time = time.time() - start_time
        if elapsed_time < 1 / frame_rate:
            time.sleep((1 / frame_rate) - elapsed_time)

finally:
    cap.release()
    cv2.destroyAllWindows()
