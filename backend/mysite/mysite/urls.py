from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from expenses.views import ExpenseViewSet, FileUploadView
from mysite.views import UserViewSet
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'expenses', ExpenseViewSet)

schema_view = get_swagger_view(title='Swagger!')

#note: use /docs/?format=openapi for JSON swagger spec
urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^docs/', schema_view, name="docs"),
    url(r'^api/', include(router.urls)),
    url(r'^api/upload', FileUploadView.as_view()),
]
