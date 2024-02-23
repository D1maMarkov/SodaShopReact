from utils.user_errors import errors as user_errors
from utils.validators import is_valid_phone
from .models.models import Order
from django import forms


class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['adress', 'payment', 'delivery', 'comment']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'] = forms.CharField(max_length=50)
        self.fields['phone'] = forms.CharField(max_length=11)
        self.fields['name'].error_messages = {'required': user_errors["empty_username"]}
        self.fields['phone'].error_messages = {'required': user_errors["incorrect_phone"]}
        self.fields['adress'].error_messages = {'required': user_errors["incorrect_adress"]}
        self.fields['payment'].error_messages = {'required': user_errors["empty_payment_method"]}
        self.fields['delivery'].error_messages = {'required': user_errors["empty_delivery_method"]}

    def clean_phone(self):
        phone = self.cleaned_data['phone']

        if not is_valid_phone(phone):
            self.add_error("phone", user_errors["incorrect_phone"])
            
        return phone