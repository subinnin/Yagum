from django.shortcuts import render ,HttpResponse
import os
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.conf import settings
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
            main_food = data.get("main_food")
            sub_foods = data.get("sub_foods")
            print(main_food , sub_foods)
            return JsonResponse({"message" :"Data received successfully!"} , status = 200)
    return JsonResponse({"error " : "Invalid request"}, status = 400)

@require_GET
def get_json_data(request):
    file_path = os.path.join(settings.BASE_DIR, 'test','data', 'contentDB.json')
    #Json 파일 읽기
    with open(file_path, 'r', encoding= 'utf-8') as file:
         data = json.load(file) #데이터 파싱
         print(data)

    return JsonResponse(data, safe=False)

