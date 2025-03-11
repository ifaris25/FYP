import re
from django.shortcuts import render

def index(request):
    return render(request, "usermodule/index.html")  # Main input page

def generate_text(request):
    if request.method == "POST":
        user_text = request.POST.get("user_input", "").strip()

        arabic_regex = re.compile(r'^[\u0600-\u06FF\s]+$')
       
        if not arabic_regex.match(user_text):
            return render(request, "usermodule/result.html", {"output_text": "❌ يُسمح فقط بإدخال النصوص العربية بدون أرقام أو رموز!"})

        words = user_text.split()
        if len(words) > 10:
            return render(request, "usermodule/result.html", {"output_text": "⚠️ يُسمح بإدخال 10 كلمات كحد أقصى!"})

        output_text = f"{user_text}"

        return render(request, "usermodule/result.html", {"output_text": output_text})

    return render(request, "usermodule/index.html")  # Redirect back if no POST request
