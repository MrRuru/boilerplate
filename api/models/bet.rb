module Api::Models

  class Bet

    def initialize
      @contestants = {} # key => :winner, :loser or nil
    end


    def status
      statuses = @contestants.values

      # Not two contestants
      if statuses.count < 2
        return :not_full

      # Not finished
      elsif !statuses.all?
        return :ongoing

      # "Agreement" => actually disagreement
      elsif statuses.reduce(&:==)
        return :disagree

      else
        return :finished
      end
    end


    def add_user(id)
      if @contestants.count == 2
        return "Error : already 2 contestants in this bet"
      elsif @contestants.keys.include? id
        return "Error : user already contestant of this bet"
      else
        @contestants[id] = nil
        return "OK"
      end
    end


    def remove_user(id)
      if @contestants.count == 0
        return "Error : no more contestant to remove from this bet"
      elsif !@contestants.keys.include? id
        return "Error : user not contestant of this bet"
      else
        @contestants.remove(id)
        return "OK"
      end
    end


    def set_winning(id)
      @contestants[id] = :winning
    end


    def set_losing(id)
      @contestants[id] = :losing
    end

  end

end