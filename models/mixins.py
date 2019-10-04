class HasPlayer:

    def is_human(self):
        return self.human_player is not None

    def is_ai(self):
        return not self.is_human()
