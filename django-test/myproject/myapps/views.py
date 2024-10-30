from django.shortcuts import render

import openai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

#OPENAI API키 설정
import os
openai.api_key = os.getenv("OPENAI_API_KEY")

@csrf_exempt
def ask_chatgpt(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        question = data.get("question", "")
        
        #chatGPT API호출
        try:
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=question,
                max_token=100
            )
            answer = response.choices[0].text.strip()
            return JsonResponse({"answer": answer})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)

