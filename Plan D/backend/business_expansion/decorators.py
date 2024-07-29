from functools import wraps
from rest_framework.exceptions import PermissionDenied

def group_required(group_name):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(self, request, *args, **kwargs):
            if not request.user.is_authenticated:
                raise PermissionDenied('User is not authenticated')
            if isinstance(group_name, list):
                    if not request.user.groups.filter(name__in=group_name).exists():
                        raise PermissionDenied(f'User does not have the required groups: {", ".join(group_name)}')
            elif isinstance(group_name, str):
                if not request.user.groups.filter(name=group_name).exists():
                    raise PermissionDenied(f'User does not have the required group: {group_name}')
            else:
                raise ValueError('group_name must be a string or a list of strings.')
            return view_func(self, request, *args, **kwargs)
        return _wrapped_view
    return decorator
