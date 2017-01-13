from django.contrib.auth.models import User
from api.models import AddressType
from api.serializers import AddressTypeSerializer

user = User.objects.create_user('wave-admin', 'robert@wave.com', 'coffeewaffle73')
user.is_staff = True
user.is_superuser = True
user.save()

address_type_obj = AddressTypeSerializer(data=dict(address_type="Residential"))
address_type_obj.is_valid()
address_type_obj.save()
address_type_obj = AddressTypeSerializer(data=dict(address_type="Commercial"))
address_type_obj.is_valid()
address_type_obj.save()
