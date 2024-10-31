from django.shortcuts import render ,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

def index(request):
    article = '''
    <h2>Welcome</h2> 
    Hello, Django
    '''
    return HttpResponse((article))

@csrf_exempt
def receive_data(request):
    if request.method == 'POST':
            data = json.loads(request.body)
            input_food = data.get("input_food")
            check_food_tools = data.get("check_food_tools")
            print(input_food , check_food_tools)
            return JsonResponse({"message" :"Data received successfully!"} , status = 200)
    return JsonResponse({"error " : "Invalid request"}, status = 400)
# Create your views here.
