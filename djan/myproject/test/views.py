from django.shortcuts import render ,HttpResponse
import os
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from django.views.decorators.http import require_GET
from django.conf import settings
import json
from test.models import Recipe
import random
import openai

openai.api_key = "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"


@csrf_exempt
def receive_data(request):


    ## mysql database load
    try:
        recipes = Recipe.objects.all()
        total = [{"name": recipe.name, "description": recipe.description } for recipe in recipes]
        # print(total)
        #[{'name': '소고기메뉴1', 'description': '소고기, 감자, 떡'}]
    except Exception as e:
        return JsonResponse({"error": "Database error"}, status=500)
    
    
	# react input data load
    data = []
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # print(data)
            #{'main_food': ['돼지고기'], 'sub_foods': ['감자', '김치']} 

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
    else:
        return JsonResponse({"error": "Only POST requests are allowed"}, status=405)


    ## random pick
    filtered_total = [item for item in total if all(ingredient in item['description'] for ingredient in data.get("main_food", []) + data.get("sub_foods", []))]

    random_choice = random.choice(filtered_total) if filtered_total else {}
    print(filtered_total)
    print(random_choice)


    ## openAI connect
    if random_choice:
        try:
            question = (
                f"다음 재료로 '{random_choice['name']}' 요리를 만드는 방법을 6단계로 간결하게 설명해 주세요: {random_choice['description']}."
                f" 필요한 재료 목록과 예상 소요 시간을 명확히 구분하여 알려주세요. "
                f"예시 형식:\n조리과정:\n1. ...\n2. ...\n\n재료 목록:\n- 재료1\n- 재료2\n\n예상 소요 시간:\n- 총 XX분"
            )
            messages = [{"role": "user", "content": question}]
            completion = openai.ChatCompletion.create(model="gpt-4", messages=messages)
            openai_response = completion.choices[0].message['content'].strip()

            # 2차원 배열 초기화: [조리 과정, 추가 재료, 소요 시간]
            response_array = [[], [], []]

            # 각 섹션을 추적할 플래그들
            steps_section, ingredients_section, time_section = False, False, False
            for line in openai_response.split("\n"):
                line = line.strip()

                # 섹션 시작 조건 강화
                if "조리과정:" in line or "Steps:" in line:
                    steps_section, ingredients_section, time_section = True, False, False
                    continue
                elif "재료 목록:" in line or "Ingredients:" in line:
                    steps_section, ingredients_section, time_section = False, True, False
                    continue
                elif "예상 소요 시간:" in line or "Time:" in line:
                    steps_section, ingredients_section, time_section = False, False, True
                    continue

                # 각 섹션에 데이터 추가
                if steps_section and line:
                    response_array[0].append(line)  # 조리 과정
                elif ingredients_section and line:
                    response_array[1].append(line)  # 추가 재료
                elif time_section and line:
                    response_array[2].append(line)  # 소요 시간

            # 디버그 출력
            print("조리과정:", response_array[0])
            print("추가재료:", response_array[1])
            print("소요시간:", response_array[2])

        except Exception as e:
            openai_response = f"Error in OpenAI request: {e}"
            response_array = [[], [], []]
            print(f"OpenAI API Error: {e}")
    else:
        openai_response = "No matching items found."
        response_array = [[], [], []]


    return JsonResponse({
        "random_choice": random_choice,
        "openai_response": openai_response,
        "cooking_details": response_array
    })