<div class="register">
    <h1>Register</h1>

    <form action="?/register" method="post">
        <div>
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
        </div>
        <div>
            <label for="password_confirmation">Confirm Password</label>
            <input type="password" id="password_confirmation" name="password_confirmation" required>
        </div>
        <button type="submit">Register</button>
    </form>
    <p>
        Already have an account? You can login yourself <a href="/login">here!</a>
    </p>
</div>

<style lang="scss">
    @import '../../variables.scss';

    div.register {
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;
        padding: 20px;
        border-radius: 5px;
        min-width: 350px;
        border: none;
        background-color: white;
        max-width: 400px;

        h1 {
            position: relative;
            display: block;
            font-size: 2.5em;
            font-weight: bold;
        }

        p {
            position: relative;
            display: block;
            text-align: center;
            a {
                color: blue;
                text-decoration: none;
            }
        }

        form {
            position: relative;
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-start;
            align-items: center;
            gap: 20px;
            width: 100%;

            div {
                position: relative;
                display: flex;
                flex-flow: column nowrap;
                justify-content: flex-start;
                align-items: flex-start;
                width: 100%;
                gap: 5px;

                label {
                    position: relative;
                    display: block;
                    font-weight: bold;
                }

                input {
                    position: relative;
                    display: block;
                    width: 100%;
                    padding: 5px;
                    border: 1px solid $secondary;
                    border-radius: 5px;
                }
            }

            button {
                position: relative;
                display: block;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                background-color: $primary;
                color: white;
                font-weight: bold;
                cursor: pointer;
                width: 50%;
            }

        }
    }
</style>