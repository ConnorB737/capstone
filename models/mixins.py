class HasPlayer:

    def is_human(self):
        return self.human_player is not None

    def is_ai(self):
        return not self.is_human()

    @property
    def player(self):
        return self.human_player if self.is_human() else self.ai_player
