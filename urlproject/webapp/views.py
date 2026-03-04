from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect

def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def redirect_home(request):
    return redirect('/')
