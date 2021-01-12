from firebase import firebase

firebase_client = firebase.FirebaseApplication(
    "https://revenue-computation-syst-2aa96-default-rtdb.firebaseio.com/", None)  # url

result = firebase_client.get("/revenue-computation-system/records", '')
print(result)
