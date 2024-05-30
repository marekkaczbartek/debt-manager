import pytest


class DebtServiceTests:
    def test_add_debt(self):
        # Create a DebtService instance
        debt_service = DebtService()

        # Add debts for multiple users
        debt_service.add_debt("user1", 100)
        debt_service.add_debt("user2", 200)
        debt_service.add_debt("user3", 300)

        # Assert that the debts were added correctly
        assert debt_service.get_debt("user1") == 100
        assert debt_service.get_debt("user2") == 200
        assert debt_service.get_debt("user3") == 300


if __name__ == "__main__":
    pytest.main()
