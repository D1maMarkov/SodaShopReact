from utils.user_errors import errors as user_errors
from django import forms
from utils.validators import is_valid_phone


class OrderForm(forms.Form):
    name = forms.CharField(max_length=100, required=False)
    phone = forms.CharField(required=False)
    adress = forms.CharField(max_length=255, required=False)
    payment = forms.CharField(max_length=255, required=False)
    delivery = forms.CharField(max_length=255, required=False)
    comment = forms.CharField(max_length=1000, required=False)
    
    def clean(self):
        cleaned_data = super().clean()
        name = cleaned_data.get('name')
        phone = cleaned_data.get('phone')
        adress = cleaned_data.get('adress')
        payment = cleaned_data.get('payment')
        delivery = cleaned_data.get('delivery')

        errors = {
            "name": "",
            "phone": "",
            "adress": "",
            "payment": "",
            "delivery": ""
        }
        
        if not name:
            errors["name"] = user_errors["empty_username"]

        if not is_valid_phone(phone):
            errors["phone"] = user_errors["incorrect_phone"]
            
        if not adress:
            errors["adress"] = user_errors["incorrect_adress"]

        if not payment:
            errors["payment"] = user_errors["empty_payment_method"]
            
        if not delivery:
            errors["delivery"] = user_errors["empty_delivery_method"]

        no_errors = True

        for error in errors.values():
            if len(error) > 0:
                no_errors = False

        if not no_errors:
            for key in errors:
                self.add_error(key, errors[key])