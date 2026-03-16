from django.shortcuts import get_object_or_404
from .serializers import StudentSerializer
from .models import Student
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response


@api_view(["GET"])
def get_list(request):
    student = Student.objects.all()
    serializer = StudentSerializer(student, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def create_list(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "PATCH"])
def update_list(request, pk):
    student = get_object_or_404(Student, id=pk)

    serializer = StudentSerializer(
        student, data=request.data, partial=request.method == "PATCH"
    )
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_list(request, pk):
    student = get_object_or_404(Student, id=pk)
    student.delete()
    return Response({"message": "Student deleted successfully"})
